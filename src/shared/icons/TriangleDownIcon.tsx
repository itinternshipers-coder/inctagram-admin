import * as React from 'react'

export type IconProps = {
  sizeWidth?: number
  sizeHeight?: number
  color?: string
  className?: string
} & React.SVGProps<SVGSVGElement>
const ArrowIosDownOutlineIcon = ({ sizeWidth = 8, sizeHeight = 12, color, className, ...rest }: IconProps) => (
  <svg
    width={sizeWidth}
    height={sizeHeight}
    viewBox={`0 0 ${sizeWidth} ${sizeHeight}`}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.46411 4.5L9.53674e-06 0L6.92821 0L3.46411 4.5Z" fill="currentColor" />
  </svg>
)
export default ArrowIosDownOutlineIcon
