export default defineAppConfig({
    ui: {
        calendar: {
            slots: {
                root: "",
                header: "flex items-center justify-between",
                body: "flex flex-col space-y-4 pt-4 sm:flex-row sm:space-x-4 sm:space-y-0",
                heading: "text-center font-medium truncate mx-auto",
                grid: "w-full border-collapse select-none space-y-1 focus:outline-none",
                gridRow: "grid grid-cols-7 place-items-center",
                gridWeekDaysRow: "mb-1 grid w-full grid-cols-7",
                gridBody: "grid",
                headCell: "rounded-md",
                cell: "relative text-center",
                cellTrigger: [
                    "m-0.5 relative flex items-center justify-center rounded-full whitespace-nowrap focus-visible:ring-2 focus:outline-none data-disabled:text-muted data-unavailable:line-through data-unavailable:text-muted data-unavailable:pointer-events-none data-[selected]:text-inverted data-today:font-semibold data-[outside-view]:text-muted",
                    "transition",
                ],
            },
            variants: {
                color: {
                    primary: {
                        headCell: "text-primary",
                        cellTrigger:
                            "focus-visible:ring-primary data-[selected]:bg-primary data-today:not-data-[selected]:text-primary data-[highlighted]:bg-primary/20 hover:not-data-[selected]:bg-primary/20",
                    },
                    secondary: {
                        headCell: "text-secondary",
                        cellTrigger:
                            "focus-visible:ring-secondary data-[selected]:bg-secondary data-today:not-data-[selected]:text-secondary data-[highlighted]:bg-secondary/20 hover:not-data-[selected]:bg-secondary/20",
                    },
                    success: {
                        headCell: "text-success",
                        cellTrigger:
                            "focus-visible:ring-success data-[selected]:bg-success data-today:not-data-[selected]:text-success data-[highlighted]:bg-success/20 hover:not-data-[selected]:bg-success/20",
                    },
                    info: {
                        headCell: "text-info",
                        cellTrigger:
                            "focus-visible:ring-info data-[selected]:bg-info data-today:not-data-[selected]:text-info data-[highlighted]:bg-info/20 hover:not-data-[selected]:bg-info/20",
                    },
                    warning: {
                        headCell: "text-warning",
                        cellTrigger:
                            "focus-visible:ring-warning data-[selected]:bg-warning data-today:not-data-[selected]:text-warning data-[highlighted]:bg-warning/20 hover:not-data-[selected]:bg-warning/20",
                    },
                    error: {
                        headCell: "text-error",
                        cellTrigger:
                            "focus-visible:ring-error data-[selected]:bg-error data-today:not-data-[selected]:text-error data-[highlighted]:bg-error/20 hover:not-data-[selected]:bg-error/20",
                    },
                    neutral: {
                        headCell: "text-highlighted",
                        cellTrigger:
                            "focus-visible:ring-inverted data-[selected]:bg-inverted data-today:not-data-[selected]:text-highlighted data-[highlighted]:bg-inverted/20 hover:not-data-[selected]:bg-inverted/10",
                    },
                },
                size: {
                    xs: {
                        heading: "text-xs",
                        cell: "text-xs",
                        headCell: "text-[10px]",
                        cellTrigger: "size-7",
                        body: "space-y-2 pt-2",
                    },
                    sm: {
                        heading: "text-xs",
                        headCell: "text-xs",
                        cell: "text-xs",
                        cellTrigger: "size-7",
                    },
                    md: {
                        heading: "text-sm",
                        headCell: "text-xs",
                        cell: "text-sm",
                        cellTrigger: "size-8",
                    },
                    lg: {
                        heading: "text-md",
                        headCell: "text-md",
                        cellTrigger: "size-9 text-md",
                    },
                    xl: {
                        heading: "text-lg",
                        headCell: "text-lg",
                        cellTrigger: "size-10 text-lg",
                    },
                },
            },
            defaultVariants: {
                size: "md",
                color: "primary",
            },
        },
        toast: {
            slots: {
                root: '!p-4 relative group overflow-hidden bg-default shadow-lg rounded-lg ring ring-default flex gap-2.5 focus:outline-none',
                wrapper: 'w-0 flex-1 flex flex-col',
                title: 'text-sm font-medium text-highlighted',
                description: 'text-sm text-muted',
                icon: 'shrink-0 size-5',
                avatar: 'shrink-0',
                avatarSize: '2xl',
                actions: 'flex gap-1.5 shrink-0',
                progress: 'absolute inset-x-0 bottom-0 h-1 z-[-1]',
                close: 'p-0'
            },
            variants: {
                color: {
                    primary: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary',
                        icon: 'text-primary',
                        progress: 'bg-primary'
                    },
                    secondary: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-secondary',
                        icon: 'text-secondary',
                        progress: 'bg-secondary'
                    },
                    success: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-success',
                        icon: 'text-success',
                        progress: 'bg-success'
                    },
                    info: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-info',
                        icon: 'text-info',
                        progress: 'bg-info'
                    },
                    warning: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-warning',
                        icon: 'text-warning',
                        progress: 'bg-warning'
                    },
                    error: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-error',
                        icon: 'text-error',
                        progress: 'bg-error'
                    },
                    neutral: {
                        root: 'focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-inverted',
                        icon: 'text-highlighted',
                        progress: 'bg-inverted'
                    }
                },
                orientation: {
                    horizontal: {
                        root: 'items-center',
                        actions: 'items-center'
                    },
                    vertical: {
                        root: 'items-start',
                        actions: 'items-start mt-2.5'
                    }
                },
                title: {
                    true: {
                        description: 'mt-1'
                    }
                }
            },
            defaultVariants: {
                color: 'primary'
            }
        }
    },
});
