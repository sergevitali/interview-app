import CssBaseline from '@mui/material/CssBaseline'
import { ReactNode } from 'react'
import { useStyles } from '../../styles/global.styles'

const Wrapper: React.FC<{ children: ReactNode }> = (props) => {
  const styles = useStyles()

  return (
    <>
      <CssBaseline />
      <div className={styles.classes.root}>
        <div className={styles.classes.paper}>{props.children}</div>
      </div>
    </>
  )
}

export default Wrapper
