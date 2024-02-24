import { FC } from 'react'
import {KTIcon, toAbsoluteUrl} from '../../../_metronic/helpers'
import {Link, useLocation} from 'react-router-dom'
import {Dropdown1} from '../../../_metronic/partials'
import { ToolbarWrapper } from '../../../_metronic/layout/components/toolbar'
import { Content } from '../../../_metronic/layout/components/content'

const VendorHeader: FC = () => {
  const location = useLocation()

  return (
    <>
      <ToolbarWrapper />
    </>
  )
}

export {VendorHeader}
