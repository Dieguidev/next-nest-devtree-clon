'use client'

import {
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface ActiveSocialLinksProps {
  link: {
    name: string;
    url: string;
    enabled: boolean;
  } & {
    position?: number | undefined;
  }
}

export const ActiveSocialLinks = ({ link }: ActiveSocialLinksProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.name })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        bg-white px-5 py-2 flex items-center gap-5 rounded-lg cursor-grab
        transition-all duration-200 hover:bg-gray-50
        ${isDragging ? 'opacity-50 shadow-lg scale-105 cursor-grabbing' : ''}
      `}
      {...attributes}
      {...listeners}
    >
      <div
        className="w-12 h-12 bg-cover"
        style={{
          backgroundImage: `url('/social/icon_${link.name}.svg')`
        }}
      ></div>
      <p className="capitalize">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>

      {/* Icono de drag */}
      <div className="ml-auto">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
          />
        </svg>
      </div>
    </div>
  )
}