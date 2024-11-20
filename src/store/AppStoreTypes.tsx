export type DataColected = {
  date: string
  numbersCollected: string[]
  status: 'unsended' | 'sended' | 'error'
}

// Define el tipo de datos de cada escuela
export type DataSchool = {
  name: string
  data: DataColected[]
}

// Define el estado inicial para los datos recolectados
export const DataCollectedInitial: DataColected = {
  date: '',
  numbersCollected: [],
  status: 'unsended',
}

export const SchoolInitialState: DataSchool = {
  name: '',
  data: [DataCollectedInitial],
}
