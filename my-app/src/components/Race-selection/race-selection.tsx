import {useNavigate} from 'react-router-dom'
import './race-selection.css'
import { races } from '../../data/races/races'


export const RaceSelection: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = (slug: string) => {
    console.log('Передаем расу:', slug)
    navigate('/session', {state: { selectedRace: slug } })
  }

  return (
    <div className="race-container">
      <div className="race-grid">
        {races.map(({ slug, name, src }) => (
          <button key={slug} className="race-card" onClick={() =>{handleClick(slug)}}>
            <img className="race-image" src={src} alt={name} />
          </button>
        ))}
      </div>
    </div>
  )
}