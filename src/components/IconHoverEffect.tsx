import { type ReactNode } from 'react'

type IconHoverEffectProps = {
    children: ReactNode
    pink?: boolean
}
function IconHoverEffect({ children, pink = false }: IconHoverEffectProps) {
    const colorClasses = pink ? 'outline-au-primary-300 hover:bg-au-primary-100 group-hover-bg-au-primary-100 group-focus-visible:bg-au-primary-300 focus-visible:bg-au-primary-100' : 'outline-au-gray-300 hover:bg-au-gray-100 group-hover-bg-au-gray-100 group-focus-visible:bg-au-gray-300 focus-visible:bg-au-gray-100'
    return (
        <div className={`rounded-full p-2 transition-colors duration-200 ${colorClasses}`}>{children}</div>
    )
}

export default IconHoverEffect