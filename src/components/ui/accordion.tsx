import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown, Trash2 } from 'lucide-react';
import { cn } from '@/components/ui/utils';

const Accordion = AccordionPrimitive.Root;
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('border-b', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    trash?: boolean;
  }
>(({ className, children, trash, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'text-md flex flex-1 items-start justify-between whitespace-normal break-words p-4 font-semibold transition-all md:my-2 md:items-center md:text-xl',
        { '[&[data-state=open]>svg]:rotate-180': !trash },
        className,
      )}
      {...props}
    >
      {children}
      {trash ? (
        <Trash2 className="ml-auto flex h-5 w-5 shrink-0 text-red-400" />
      ) : (
        <ChevronDown className="ml-auto flex h-5 w-5 shrink-0 transition-transform duration-200" />
      )}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden bg-gray-50 transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down md:text-lg',
      className,
    )}
    {...props}
  >
    <div className={cn('flex items-start whitespace-pre-line p-4', className)}>
      {children}
    </div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
