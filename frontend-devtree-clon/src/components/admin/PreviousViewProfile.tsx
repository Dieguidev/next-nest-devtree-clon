'use client'

import { useAuthStore } from "@/store/auth.store"
import Image from 'next/image'
import { ActiveSocialLinks } from '../links/ActiveSocialLinks'
import { useSocialLinksStore } from "@/store/social-link.store"
import { isValidUrl } from "@/utils"
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  restrictToVerticalAxis,
  restrictToParentElement,
} from '@dnd-kit/modifiers'

export const PreviousViewProfile = () => {
  const { user } = useAuthStore()
  const { socialLinks, reorderLinks } = useSocialLinksStore()

  const enableLinks = socialLinks.filter((link) =>
    link.enabled && link.url && isValidUrl(link.url)
  ).sort((a, b) => (a.position || 0) - (b.position || 0)) // Ordenar por position

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3, // Reducir la distancia para activación más sensible
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) {
      return; // No cambio o drop fuera del área
    }

    const oldIndex = enableLinks.findIndex(item => item.name === active.id)
    const newIndex = enableLinks.findIndex(item => item.name === over.id)

    // Verificar que los índices sean válidos
    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    // Solo proceder si realmente hay un cambio de posición
    if (oldIndex !== newIndex) {
      // Reordenar solo los enlaces activos
      const reorderedActiveLinks = arrayMove(enableLinks, oldIndex, newIndex)

      // Llamar a la función del store para reordenar y guardar automáticamente
      await reorderLinks(reorderedActiveLinks)
    }
  }

  return (
    <>
      <p className="text-4xl text-center text-white">
        {user?.slug}
      </p>

      {user?.image ? (
        <Image
          src={user.image}
          alt='Imagen Perfil'
          width={250}
          height={250}
          className='mx-auto max-w-[250px] object-cover rounded-lg'
        />
      ) : (
        <div className="w-[250px] h-[250px] bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <p className="text-center text-lg font-black text-white">
        {user?.description || 'No tienes descripción'}
      </p>

      <div className="mt-20">
        {enableLinks.length > 0 ? (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCorners}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={enableLinks.map(link => link.name)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-5">
                {enableLinks.map(link => (
                  <ActiveSocialLinks key={link.name} link={link} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        ) : (
          <p className="text-center text-white opacity-60">
            No tienes enlaces sociales activos
          </p>
        )}
      </div>
    </>
  )
}
