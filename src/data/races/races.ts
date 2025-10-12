// Обложки для выбора рас
import aqua from '../../Races/aqua.png'
import elves from '../../Races/elves.png'
import gnomes from '../../Races/gnomes.png'
import orcs from '../../Races/orcs.png'
import human from '../../Races/human.png'
import undead from '../../Races/undead.png'

// Планшеты для рисования
import aquaTablet from '../../Races/session-race/aqua.jpg'
import elvesTablet from '../../Races/session-race/elves.jpg'
import gnomesTablet from '../../Races/session-race/gnomes.jpg'
import orcsTablet from '../../Races/session-race/orcs.jpg'
import humanTablet from '../../Races/session-race/human.jpg'
import undeadTablet from '../../Races/session-race/undead.jpg'

export type RaceItem = { 
  slug: string; 
  name: string; 
  src: string;
  sessionImage?: string;
}

export const races: RaceItem[] = [
  { slug: 'aqua', name: 'Aqua', src: aqua, sessionImage: aquaTablet },
  { slug: 'elves', name: 'Elves', src: elves, sessionImage: elvesTablet },
  { slug: 'gnomes', name: 'Gnomes', src: gnomes, sessionImage: gnomesTablet },
  { slug: 'orcs', name: 'Orcs', src: orcs, sessionImage: orcsTablet },
  { slug: 'human', name: 'Human', src: human, sessionImage: humanTablet },
  { slug: 'undead', name: 'Undead', src: undead, sessionImage: undeadTablet },
]