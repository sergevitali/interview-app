import styled from 'styled-components'
import { useAppSelector } from '../hooks'
import { RootState } from '../store'

const HotAnimeContainer = styled.div`
  max-width: 1280px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`

const AnimeItemContainer = styled.div`
  width: 17em;
  height: 18em;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const AnimeCover = styled.div`
  width: auto;
  height: 15em;
  img {
    width: auto;
    height: 100%;
  }
`

const AnimeTitle = styled.h6`
  margin-top: 8px;
  font-size: 15px;
  color: #000;
  font-weight: 500;
`

const HotAnime: React.FC = () => {
  const { animePage } = useAppSelector((state: RootState) => state.homePage)

  const isEmptyAnimePage =
    !animePage || !animePage.media || animePage.media.length === 0

  if (isEmptyAnimePage) return <div>Loading...</div>

  return (
    <HotAnimeContainer>
      {animePage &&
        animePage.media?.map((anime, index) => (
          <AnimeItemContainer key={index}>
            <AnimeCover>
              <img
                src={anime?.coverImage?.extraLarge || ''}
                alt={anime?.title?.english ? anime?.title?.english : ''}
              />
            </AnimeCover>
            <AnimeTitle>{anime?.title?.english}</AnimeTitle>
            <h5>Average Score: {anime?.averageScore}</h5>
          </AnimeItemContainer>
        ))}
    </HotAnimeContainer>
  )
}
export default HotAnime
