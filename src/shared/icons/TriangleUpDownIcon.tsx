import * as React from 'react'

export type IconProps = {
  sizeWidth?: number
  sizeHeight?: number
  color?: string
  className?: string
} & React.SVGProps<SVGSVGElement>
const TriangleUpDownIcon = ({ sizeWidth = 8, sizeHeight = 12, className, ...rest }: IconProps) => (
  <svg
    width={sizeWidth}
    height={sizeHeight}
    viewBox={`0 0 ${sizeWidth} ${sizeHeight}`}
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="#4C4C4C" />
    <path d="M4 12L0.535898 7.5L7.4641 7.5L4 12Z" fill="#4C4C4C" />
  </svg>
)
export default TriangleUpDownIcon
