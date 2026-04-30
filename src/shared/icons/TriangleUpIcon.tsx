import * as React from 'react'

export type IconProps = {
  sizeWidth?: number
  sizeHeight?: number
  color?: string
  className?: string
} & React.SVGProps<SVGSVGElement>

const ArrowIosUpIcon = ({ sizeWidth = 8, sizeHeight = 12, color, className, ...rest }: IconProps) => (
  <svg
    width={sizeWidth}
    height={sizeHeight}
    viewBox={`0 0 ${sizeWidth} ${sizeHeight}`}
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M3.46411 0L6.92821 4.5H9.77516e-06L3.46411 0Z" fill="currentColor" />
  </svg>
)
export default ArrowIosUpIcon
