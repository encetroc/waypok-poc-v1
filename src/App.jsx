import { useState } from 'react'
import { createVehicle } from '@/firebase/firestore'
import { CreateVehicleForm } from '@/CreateVehicleForm'
import './App.css'

function App() {
  return (
    <div className="App">
      <CreateVehicleForm />
    </div>
  )
}

export default App
