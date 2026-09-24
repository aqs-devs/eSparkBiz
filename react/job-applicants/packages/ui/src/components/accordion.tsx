import { Accordion as AccordionPrimitive } from '@base-ui/react/accordion';

import { cn } from '../lib/utils';

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
    return <AccordionPrimitive.Root data-slot="accordion" className={cn('w-full', className)} {...props} />;
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
    return <AccordionPrimitive.Item data-slot="accordion-item" className={cn('border-b', className)} {...props} />;
}

function AccordionHeader({ className, ...props }: AccordionPrimitive.Header.Props) {
    return <AccordionPrimitive.Header data-slot="accordion-header" className={cn('m-0', className)} {...props} />;
}

function AccordionTrigger({ className, ...props }: AccordionPrimitive.Trigger.Props) {
    return <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn('flex w-full items-center justify-between py-3 text-start font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', className)} {...props} />;
}

function AccordionContent({ className, ...props }: AccordionPrimitive.Panel.Props) {
    return <AccordionPrimitive.Panel data-slot="accordion-content" className={cn('pb-3', className)} {...props} />;
}

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent };
