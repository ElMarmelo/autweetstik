"use client";
import clsx from "clsx";
import { forwardRef } from "react";
import { VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";


const variants = cva([
    'rounded-full',
    'tracking-wide',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'justify-center',
    'relative',
    'transition',
    'outline-none',
    'focus:scale-[0.98]',
    'disabled:cursor-not-allowed'
], {
    variants: {
        variant: {
            primary: [
                'bg-au-primary-500',
                'text-au-gray-100',
                'text-xl',
                'font-semibold',
                'shadow',
                'hover:bg-au-primary-700',
                'disabled:bg-au-primary-500/50',
                'disabled:shadow',
                'ring-au-primary-500/70 ring-offset-2',
                'focus-visible:ring-2 focus:scale-[0.98]',],
            secondary: [],
            tertiary: [],
            ghostPrimary: [],
            ghostSecondary: []
        },
        size: {
            small: [

            ],
            medium: [

            ],
            large: [

            ]
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'medium'
    }
})

const Loading = () => (
    <div className="absolute inline-flex items-center">
        <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit]" />
    </div>
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof variants> & {
        loading?: boolean
    };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, loading, ...rest }, ref) => {
    return (<button ref={ref} className={twMerge(variants({ variant, size, className }))} {...rest} >
        {loading && <Loading />}
        <span className={clsx('transition', {
            'opacity-0': loading,
            'opacity-100': !loading
        })}>{children}</span>

    </button>
    )
}
)

Button.displayName = 'Button'

export { Button }
