import { FC } from 'react'
import {useLocation} from 'react-router-dom'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'

const UserHeader: FC = () => {
  const location = useLocation()

  return (
    <>
      <ToolbarWrapper />
    </>
  )
}

export {UserHeader}
