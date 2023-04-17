import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FadeInSection = ({ children }: Props) => {
  const domRef = React.useRef<HTMLElement>(null);

  const [isVisible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // In your case there's only one element to observe:
      if (entries[0].isIntersecting) {
        // Not possible to set it back to false like this:
        setVisible(true);

        // No need to keep observing:
        observer.unobserve(domRef.current!);
      }
    });

    observer.observe(domRef.current!);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={domRef} className={isVisible ? ' is-visible' : ''}>
      {children}
    </section>
  );
};

export default FadeInSection;
