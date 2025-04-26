import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "./label"

type FormControlProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  children: React.ReactNode
} & ControllerProps<TFieldValues, TName>

const FormControl = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  children,
  name,
  ...props
}: FormControlProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      shouldUnregister={true}
      render={({ field }) => <Slot {...field}>{children}</Slot>}
      {...props}
    />
  )
}

type FormItemProps = React.HTMLAttributes<HTMLDivElement>

const FormItem = React.forwardRef<HTMLDivElement, FormItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-2", className)} {...props} />
    )
  }
)
FormItem.displayName = "FormItem"

type FormLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  FormLabelProps
>(({ className, ...props }, ref) => {
  const { required } = useFormContext()

  return (
    <Label
      ref={ref}
      className={cn(required ? "after:content-['*']" : "", className)}
      {...props}
    />
  )
})
FormLabel.displayName = "FormLabel"

type FormDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

type FormMessageProps = React.HTMLAttributes<HTMLParagraphElement>

const FormMessage = React.forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      />
    )
  }
)
FormMessage.displayName = "FormMessage"

export {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
}
