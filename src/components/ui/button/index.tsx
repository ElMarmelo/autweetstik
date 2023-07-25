"use client";
import clsx from "clsx";
import React, { forwardRef } from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

//Estilso base y variantes de estilo y tamaño para los botones
const variants = cva([
    'rounded-full',
    'tracking-wide',
    'cursor-pointer',
    'inline-flex',
    'items-center',
    'text-center',
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
                'font-semibold',
                'shadow',
                'hover:bg-au-primary-700',
                'disabled:bg-au-primary-500/50',
                'disabled:shadow',
                'ring-au-primary-500/70',
                'ring-offset-2',
                'focus-visible:ring-2',
                'focus:scale-[0.98]'
            ],
            secondary: [
                'bg-au-gray-100',
                'text-au-dark-900',
                'font-semibold',
                'shadow',
                'hover:bg-au-gray-300',
                'disabled:bg-au-gray-100/50',
                'disabled:shadow',
                'ring-au-gray-100/70',
                'ring-offset-2',
                'focus-visible:ring-2',
                'focus:scale-[0.98]'
            ],
            tertiary: [
                'bg-au-dark-100',
                'text-au-gray-100',
                'font-semibold',
                'shadow',
                'hover:bg-au-dark-300',
                'disabled:bg-au-dark-100/50',
                'disabled:shadow',
                'ring-au-dark-100/70',
                'ring-offset-2',
                'focus-visible:ring-2',
                'focus:scale-[0.98]'
            ],
            ghostPrimary: [
                'bg-transparent',
                'text-au-primary-500',
                'border-au-primary-500',
                'border-2',
                'font-semibold',
                'shadow',
                'hover:border-au-primary-700',
                'hover:text-au-gray-100',
                'hover:bg-au-primary-700',
                'disabled:border-au-primary-500/50',
                'disabled:shadow',
                'ring-au-primary-500/70',
                'ring-offset-2',
                'focus-visible:ring-2',
                'focus-scale-[0.98]'
            ],
            ghostSecondary: [
                'bg-transparent',
                'text-au-gray-100',
                'border-au-gray-100',
                'border-2',
                'font-semibold',
                'shadow',
                'hover:border-au-gray-300',
                'hover:text-au-dark-900',
                'hover:bg-au-gray-300',
                'disabled:border-au-gray-300/50',
                'disabled:shadow',
                'ring-au-gray-100/70',
                'ring-offset-2',
                'focus-visible:ring-2',
                'focus-scale-[0.98]'
            ]
        },
        size: {
            sm: [
                'px-4',
                'h-8'
            ],
            md: [
                'px-5',
                'h-10',
                'text-lg'
            ],
            lg: [
                'px-8',
                'h-12',
                'text-xl'
            ]
        },
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md'
    }
})

//Elemento loading que se puede renderizar en caso de que se necesite
const Loading = () => (
    <div className="absolute inline-flex items-center">
        <div className="w-4 h-4 rounded-full border-2 border-b-transparent animate-spin border-[inherit] " />
    </div>
)

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof variants> & {
        loading?: boolean;
        icon?: React.ReactNode
    };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, children, loading, icon, ...rest }, ref) => {
    return (<button ref={ref} className={twMerge(variants({ variant, size, className }))} {...rest} >
        {loading && <Loading />}
        <div className="inline-flex items-center">

            <span className={clsx('transition', {
                'opacity-0': loading,
                'opacity-100': !loading
            })}>
                {children}
            </span>
            {icon && <span className="ml-2">{icon}</span>}
        </div>

    </button>
    )
}
)

Button.displayName = 'Button'

export { Button }
