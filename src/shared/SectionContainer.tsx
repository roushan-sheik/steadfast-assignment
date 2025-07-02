'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import clsx from 'clsx';

type SectionContainerProps = {
  children: ReactNode;
  containerWrapperProps?: HTMLAttributes<HTMLDivElement>;
  containerInnerProps?: HTMLAttributes<HTMLDivElement>;
};

const SectionContainer = ({
  children,
  containerWrapperProps,
  containerInnerProps,
}: SectionContainerProps) => {
  return (
    <div
      {...containerWrapperProps}
      className={clsx(
        'flex items-center justify-center w-full max-w-screen',
        containerWrapperProps?.className
      )}
    >
      <div
        {...containerInnerProps}
        className={clsx(
          'flex flex-col w-full max-w-[1260px] mx-auto px-5',
          containerInnerProps?.className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default SectionContainer;
