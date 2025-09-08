import {useNavigate} from 'react-router-dom'
import './race-selection.css'

import aqua from '../../Races/aqua.png'
import elves from '../../Races/elves.png'
import gnomes from '../../Races/gnomes.png'
import orcs from '../../Races/orcs.png'
import human from '../../Races/human.png'
import undead from '../../Races/undead.png'

type RaceItem = { slug: string; name: string; src: string }

const races: RaceItem[] = [
  { slug: 'aqua', name: 'Aqua', src: aqua },
  { slug: 'elves', name: 'Elves', src: elves },
  { slug: 'gnomes', name: 'Gnomes', src: gnomes },
  { slug: 'orcs', name: 'Orcs', src: orcs },
  { slug: 'human', name: 'Human', src: human },
  { slug: 'undead', name: 'Undead', src: undead },
]

export const RaceSelection: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/session')
  }

  return (
    <div className="race-container">
      <div className="race-grid">
        {races.map(({ slug, name, src }) => (
          <button key={slug} className="race-card" onClick={handleClick}>
            <img className="race-image" src={src} alt={name} />
          </button>
        ))}
      </div>
    </div>
  )
}