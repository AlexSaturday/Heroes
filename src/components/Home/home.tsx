import {useNavigate} from 'react-router-dom'
import './Home.css'
import heroLogo from '../../assets/hero-logo.png'

export const Home: React.FC = () => {
    const navigate = useNavigate()
  
    const handlePlay = () => {
      navigate('/race-selection')
    }
  
    return (
      <div className="home-container">
        <div className="home-content">
          <h1 className="home-title">Погрузитесь в мир ЛГБТ-героеев</h1>
          <p className="home-subtitle">Выбери свой гендер и начни эпическое приключение</p>
          <button className="play-button" onClick={handlePlay}>
            Начать игру
          </button>
        </div>

        <div className="image-section">
          <img 
            src= {heroLogo}
            alt="Вступительное изображение игры" 
            className="intro-image"
          />
        </div>
      </div>
    )
  }