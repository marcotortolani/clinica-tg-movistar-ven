import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { DataSchool } from './AppStoreTypes'

type State = {
  schools: DataSchool[]
  selectedSchool: string
}

// Define las acciones que mutarán el estado
type Action = {
  setSchoolName: (name: string) => void
  addNumberCollected: (name: string, number: string) => void
  updateStatus: (date: string, status: 'unsended' | 'sended' | 'error') => void
}

export const useStore = create(
  persist<State & Action>(
    (set) => ({
      // Estado inicial
      schools: [],
      selectedSchool: '',

      // Acción para establecer el nombre de la escuela
      setSchoolName: (name: string) => {
        set((state) => {
          const schoolExists = state.schools.some(
            (school) => school.name === name
          )

          // Solo añade la escuela si no existe
          if (!schoolExists) {
            return {
              ...state,
              schools: [...state.schools, { name, data: [] }],
            }
          }

          return {
            ...state,
            selectedSchool: name,
          }
        })
      },

      // Acción para agregar un número a la lista de números recolectados
      addNumberCollected: (name: string, number: string) => {
        set((state) => {
          return {
            ...state,
            schools: state.schools.map((school) => {
              if (school.name === name) {
                let lastEntry = school.data[school.data.length - 1]

                // Si no hay fecha, crea una nueva entrada con la fecha actual
                if (
                  !lastEntry ||
                  lastEntry.date !== new Date().toLocaleDateString('es-ES')
                ) {
                  lastEntry = {
                    date: new Date().toLocaleDateString('es-ES'),
                    numbersCollected: [],
                    status: 'unsended',
                  }
                  school.data = [...school.data, lastEntry]
                }

                // Agrega el número recolectado a la última entrada
                lastEntry.numbersCollected.push(number)

                return {
                  ...school,
                  data: [...school.data],
                }
              }
              return school
            }),
          }
        })
      },
      updateStatus: (date: string, status: 'unsended' | 'sended' | 'error') => {
        set((state) => {
          return {
            ...state,
            schools: state.schools.map((school) => {
              return {
                ...school,
                data: school.data.map((data) => {
                  if (data.date === date) {
                    return {
                      ...data,
                      status,
                    }
                  }
                  return data
                }),
              }
            }),
          }
        })
      },
    }),
    {
      name: 'clinica-tg-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
