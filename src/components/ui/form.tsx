
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
  UseFormReturn,
} from "react-hook-form"

import { cn } from "@/lib/utils"
import { Label } from "./label"

// Create a Form component that wraps FormProvider
const Form = React.forwardRef<
  HTMLFormElement, 
  React.FormHTMLAttributes<HTMLFormElement> & { 
    form: UseFormReturn<any>
  }
>(({ form, className, ...props }, ref) => (
  <FormProvider {...form}>
    <form ref={ref} className={cn(className)} {...props} />
  </FormProvider>
))
Form.displayName = "Form"

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
  const formContext = useFormContext();
  const required = false; // Default value if we can't determine from context

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

// Create a form field component that will handle render prop
type FormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
  render: ({
    field,
    fieldState,
  }: {
    field: any
    fieldState: any
  }) => React.ReactNode
} & Omit<ControllerProps<TFieldValues, TName>, "render">

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  render,
  ...props
}: FormFieldProps<TFieldValues, TName>) => {
  return (
    <Controller
      name={name}
      {...props}
      render={({ field, fieldState, formState }) => 
        render({ field, fieldState, formState })
      }
    />
  )
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
}
