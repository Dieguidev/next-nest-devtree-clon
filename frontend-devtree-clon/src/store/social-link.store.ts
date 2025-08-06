// stores/useSocialLinksStore.ts
import { create } from "zustand";
import { SocialLink } from "@/interfaces/social.interface";
import { getSocialLinks } from "@/action/social-links/get-social-links-actions";
import { updateSocialLinks } from "@/action/social-links/update-social-links.action";
import { toast } from "sonner";
import { isValidUrl } from "@/utils";

interface SocialLinksState {
  // Estado
  socialLinks: (SocialLink & { position?: number })[];
  isLoading: boolean;
  isSaving: boolean;
  lastUpdated: Date | null;

  // Acciones
  setSocialLinks: (links: (SocialLink & { position?: number })[]) => void;
  updateLink: (name: string, updates: Partial<SocialLink>) => void;
  toggleLink: (name: string) => void;
  loadSocialLinks: (token: string) => Promise<void>;
  saveSocialLinks: (token: string) => Promise<boolean>;
  reorderLinks: (
    reorderedActiveLinks: (SocialLink & { position?: number })[]
  ) => Promise<void>;
  resetStore: () => void;
}

export const useSocialLinksStore = create<SocialLinksState>((set, get) => ({
  // Estado inicial
  socialLinks: [],
  isLoading: false,
  isSaving: false,
  lastUpdated: null,

  // Setear enlaces sociales
  setSocialLinks: (links) =>
    set({ socialLinks: links, lastUpdated: new Date() }),

  // Actualizar un enlace específico
  updateLink: (name, updates) =>
    set((state) => ({
      socialLinks: state.socialLinks.map((link) =>
        link.name === name ? { ...link, ...updates } : link
      ),
    })),

  // Toggle de habilitado/deshabilitado con validación
  toggleLink: (name) => {
    const state = get();
    const link = state.socialLinks.find((l) => l.name === name);

    if (!link) return;

    // Si está tratando de ACTIVAR el enlace, validar la URL primero
    if (!link.enabled && (!link.url || !isValidUrl(link.url))) {
      toast.error(`La URL de ${link.name} no es válida`);
      return;
    }

    set((state) => {
      // Si se está activando el enlace y no tiene position, asignar una nueva
      if (
        !link.enabled &&
        (link.position === undefined || link.position >= 999)
      ) {
        // Encontrar la máxima position de los enlaces activos
        const activeLinks = state.socialLinks.filter(
          (l) => l.enabled && l.url && isValidUrl(l.url)
        );
        const maxPosition =
          activeLinks.length > 0
            ? Math.max(...activeLinks.map((l) => l.position || 0))
            : -1;

        return {
          socialLinks: state.socialLinks.map((l) =>
            l.name === name
              ? { ...l, enabled: !l.enabled, position: maxPosition + 1 }
              : l
          ),
        };
      }

      // Toggle normal
      return {
        socialLinks: state.socialLinks.map((l) =>
          l.name === name ? { ...l, enabled: !l.enabled } : l
        ),
      };
    });
  },

  // Cargar enlaces desde el backend
  loadSocialLinks: async (token) => {
    set({ isLoading: true });

    try {
      const result = await getSocialLinks(token);

      // Importar la estructura base de enlaces sociales
      const { social } = await import("@/data/social");

      if (result.success) {
        // SIEMPRE fusionar con la estructura completa de enlaces
        const mergedLinks = social.map((localLink, index) => {
          // Buscar si existe este enlace en el backend
          const backendLink = result.socialLinks?.find(
            (bl) => bl.name === localLink.name
          );

          // Si existe en el backend, usar esos datos, sino usar los valores por defecto
          return backendLink
            ? { ...localLink, ...backendLink }
            : { ...localLink, url: "", enabled: false, position: index }; // Asignar position por defecto
        });

        set({
          socialLinks: mergedLinks,
          lastUpdated: new Date(),
        });
      } else {
        // Si hay error, al menos mostrar la estructura básica
        set({
          socialLinks: social.map((link, index) => ({
            ...link,
            url: "",
            enabled: false,
            position: index, // Asignar position por defecto
          })),
          lastUpdated: new Date(),
        });
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error loading social links:", error);
      // En caso de error, mostrar estructura básica
      const { social } = await import("@/data/social");
      set({
        socialLinks: social.map((link, index) => ({
          ...link,
          url: "",
          enabled: false,
          position: index, // Asignar position por defecto
        })),
        lastUpdated: new Date(),
      });
      toast.error("Error al cargar los enlaces sociales");
    } finally {
      set({ isLoading: false });
    }
  },

  // Guardar enlaces al backend
  saveSocialLinks: async (token) => {
    const { socialLinks } = get();
    set({ isSaving: true });

    try {
      // ENVIAR TODOS los enlaces, activos e inactivos
      const linksToSave = socialLinks.map((link, index) => ({
        name: link.name,
        url: link.url || "", // Si no tiene URL, enviar string vacío
        enabled: link.enabled,
        position: link.position || index,
      }));

      const result = await updateSocialLinks({
        token,
        socialLinks: linksToSave, // Enviar TODOS, no filtrar
      });

      if (result.success) {
        toast.success(result.message);

        // NO fusionar, mantener exactamente lo que acabamos de enviar
        // Solo actualizar si es necesario hacer una recarga completa
        if (!result.socialLinks || result.socialLinks.length === 0) {
          // Solo recargar si no hay datos en la respuesta
          await get().loadSocialLinks(token);
        }
        // Si hay datos, mantener el estado actual que ya es correcto

        return true;
      } else {
        toast.error(result.message);
        return false;
      }
    } catch (error) {
      console.error("Error saving social links:", error);
      toast.error("Error inesperado al guardar");
      return false;
    } finally {
      set({ isSaving: false });
    }
  },

  // Reset del store
  resetStore: () =>
    set({
      socialLinks: [],
      isLoading: false,
      isSaving: false,
      lastUpdated: null,
    }),

  // Reordenar enlaces y guardar automáticamente
  reorderLinks: async (reorderedActiveLinks) => {
    const { socialLinks } = get();
    const token = localStorage.getItem("authToken");

    if (!token) return;

    // Crear una copia del array completo
    const updatedLinks = [...socialLinks];

    // Paso 1: Asignar nuevas posiciones SOLO a los enlaces activos reordenados
    reorderedActiveLinks.forEach((reorderedLink, index) => {
      const linkIndex = updatedLinks.findIndex(
        (link) => link.name === reorderedLink.name
      );
      if (linkIndex !== -1) {
        updatedLinks[linkIndex] = {
          ...updatedLinks[linkIndex],
          position: index, // Posiciones 0, 1, 2, 3...
        };
      }
    });

    // Paso 2: Reasignar posiciones a TODOS los enlaces inactivos (después de los activos)
    const inactiveLinks = updatedLinks.filter(
      (link) =>
        !reorderedActiveLinks.some(
          (activeLink) => activeLink.name === link.name
        )
    );

    inactiveLinks.forEach((inactiveLink, index) => {
      const linkIndex = updatedLinks.findIndex(
        (link) => link.name === inactiveLink.name
      );
      if (linkIndex !== -1) {
        updatedLinks[linkIndex] = {
          ...updatedLinks[linkIndex],
          position: reorderedActiveLinks.length + index, // Después de los activos
        };
      }
    });

    // Actualizar el store inmediatamente para feedback visual
    set({ socialLinks: updatedLinks });

    // Guardar automáticamente en el backend
    await get().saveSocialLinks(token);
  },
}));
