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

    set((state) => ({
      socialLinks: state.socialLinks.map((link) =>
        link.name === name ? { ...link, enabled: !link.enabled } : link
      ),
    }));
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
        const mergedLinks = social.map((localLink) => {
          // Buscar si existe este enlace en el backend
          const backendLink = result.socialLinks?.find(
            (bl) => bl.name === localLink.name
          );

          // Si existe en el backend, usar esos datos, sino usar los valores por defecto
          return backendLink
            ? { ...localLink, ...backendLink }
            : { ...localLink, url: "", enabled: false }; // Valores por defecto
        });

        set({
          socialLinks: mergedLinks,
          lastUpdated: new Date(),
        });
      } else {
        // Si hay error, al menos mostrar la estructura básica
        set({
          socialLinks: social.map((link) => ({
            ...link,
            url: "",
            enabled: false,
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
        socialLinks: social.map((link) => ({
          ...link,
          url: "",
          enabled: false,
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

      console.log("Respuesta del backend:", result);

      if (result.success) {
        toast.success(result.message);

        // Actualizar el store con los datos devueltos por el backend
        if (result.socialLinks && result.socialLinks.length > 0) {
          // Importar la estructura base para conservar iconos y otras propiedades
          const { social } = await import("@/data/social");

          // Crear un mapa con los datos del backend para acceso rápido
          const backendLinksMap = new Map(
            result.socialLinks.map((link) => [link.name, link])
          );

          // Fusionar manteniendo toda la información
          const updatedLinks = social.map((localLink) => {
            const backendData = backendLinksMap.get(localLink.name);

            if (backendData) {
              // Fusionar manteniendo propiedades del enlace local (como iconos)
              return {
                ...localLink,
                url: backendData.url,
                enabled: backendData.enabled,
                position: backendData.position,
              };
            }

            // Si no hay datos del backend, usar valores por defecto
            return {
              ...localLink,
              url: "",
              enabled: false,
              position: localLink.position || 0,
            };
          });

          set({
            socialLinks: updatedLinks,
            lastUpdated: new Date(),
          });
        } else {
          // Si no hay datos en la respuesta, recargar desde el backend
          await get().loadSocialLinks(token);
        }

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
}));
