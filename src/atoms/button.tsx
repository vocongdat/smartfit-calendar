import { ComponentProps, ReactNode } from 'react';

interface IProps
  extends Pick<
    ComponentProps<'button'>,
    'children' | 'className' | 'disabled' | 'type' | 'form' | 'onClick'
  > {
  className?: string;
  icon?: ReactNode;
}

function Button({ icon, children, className, ...rest }: IProps) {
  return (
    <button type="button" className={className} {...rest}>
      {children}
      {icon}
    </button>
  );
}

export default Button;
