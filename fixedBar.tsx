import React from 'react'
import './style.css'
import { Trash } from './types/Trash'

interface FixedBarProps {
  lat: number
  lng: number
}

export function FixedBar (props: FixedBarProps) {
  
  const defaulTrash: Trash = {
    lat: props.lat,
    lng: props.lng,
    type: 'organic'
  }

  const [trash, setTrash] = React.useState<Trash>(defaulTrash)

  //console.log(props.lat)
  //console.log(props.lng)

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
      //console.log('LAT ATUAL: ' + position.coords.latitude)
      //console.log('LNG ATUAL: ' + position.coords.longitude)
      const lat = position.coords.latitude
      const lng = position.coords.longitude

      setTrash({ ...trash, lat: lat, lng: lng })
    })
    console.log(trash)
  }, [])

  function selectOrganic () {
    setTrash({ lat: props.lat, lng: props.lng, type: 'organic' })
  }

  function selectPlastic () {
    setTrash({ ...trash, type: 'plastic' })
  }

  function selectGlass () {
    setTrash({ ...trash, type: 'glass' })
  }

  function selectMetal () {
    setTrash({ ...trash, type: 'metal' })
  }

  function selectPaper () {
    setTrash({ ...trash, type: 'paper' })
  }

  function mostrar () {
    console.log(trash)
  }

  return (
    <div id='fixed-bar'>
      <div id='trash-icons-container'>
        <img
          src='./icons/organico.svg'
          alt=''
          className='trash-icons'
          onClick={selectOrganic}
        />
        <img
          src='./icons/plastico.svg'
          alt=''
          className='trash-icons'
          onClick={selectPlastic}
        />
        <img
          src='./icons/vidro.svg'
          alt=''
          className='trash-icons'
          onClick={selectGlass}
        />
        <img
          src='./icons/metal.svg'
          alt=''
          className='trash-icons'
          onClick={selectMetal}
        />
        <img
          src='./icons/papel.svg'
          alt=''
          className='trash-icons'
          onClick={selectPaper}
        />
      </div>
      <div
        id='button-container'
        className='d-grid gap-2'
        style={{ height: '4rem' }}
      >
        <button
          className='btn btn-secondary fs-4'
          type='button'
          onClick={mostrar}
        >
          Set wastebin to current location
        </button>
      </div>
    </div>
  )
}
