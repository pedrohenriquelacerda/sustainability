import { BaseModal } from './BaseModal'
import React from 'react'

type TrashHelpModalProps = {
  isModalVisible: boolean
  onBackDropClick: () => void
}

export const TrashHelpModal: React.FC<TrashHelpModalProps> = ({
  isModalVisible,
  onBackDropClick
}) => {
  if (!isModalVisible) return null

  return (
    <BaseModal onBackDropClick={onBackDropClick}>
      <div
        style={{
          textAlign: 'center',
          padding: 5,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          fontSize: '1.3rem'
        }}
      >
        <img
          src='./logo.png'
          alt='Trash Bins'
          style={{ width: '40%', height: 'auto' }}
        />
        <h1>Types of Trash Bins</h1>
        <p>
          There are 5 different types of trash bins, each intended for a
          specific type of waste. Here they are:
        </p>

        <ul id='trashModal'>
          <li>
            <img src='/icons/organico.svg'></img>
            <strong>Organic:</strong> Biodegradable waste, such as food scraps.
          </li>
          <li>
            <img src='/icons/plastico.svg'></img>
            <strong>Plastic:</strong> Plastic materials, like bottles and
            packaging.
          </li>
          <li>
            <img src='/icons/vidro.svg'></img>
            <strong>Glass:</strong> Glass containers, jars, etc.
          </li>
          <li>
            <img src='/icons/metal.svg'></img>
            <strong>Metal:</strong> Metallic materials, such as aluminum cans.
          </li>
          <li>
            <img src='/icons/papel.svg'></img>
            <strong>Paper:</strong> Paper, cardboard, and paper products in
            general.
          </li>
        </ul>

        <button id='buttonModal' onClick={onBackDropClick}>
          Got It
        </button>
      </div>
    </BaseModal>
  )
}
