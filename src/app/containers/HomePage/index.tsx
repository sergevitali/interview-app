import { Dispatch } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import styled from 'styled-components'
import { useAppDispatch } from '../../hooks'
import AnimeService from '../../services/animeService'
import { GetAnimePage } from '../../services/animeService/__generated__/GetAnimePage'
import { setAnimePage } from './homePageSlice'
import HotAnime from '../../components/HotAnime'

interface IHomePageProps {}

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const actionDispatch = (dispatch: Dispatch) => ({
  setAnimePage: (page: GetAnimePage['Page']) => dispatch(setAnimePage(page))
})

const HomePage: React.FC<IHomePageProps> = (props: IHomePageProps) => {
  const { setAnimePage } = actionDispatch(useAppDispatch())

  useEffect(() => {
    let fetching = false

    const fetchAnimePage = async () => {
      const animePage = await AnimeService.getAnimePage(1, 5).catch((err) =>
        console.log(err)
      )
      if (animePage) setAnimePage(animePage)
    }

    !fetching && fetchAnimePage()
    return () => {
      fetching = true
    }
  }, [setAnimePage])

  return (
    <Container>
      <h1>Hot Anime</h1>
      <HotAnime />
    </Container>
  )
}
export default HomePage
