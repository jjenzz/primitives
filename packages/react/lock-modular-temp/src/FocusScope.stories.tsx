import React from 'react';
import { FocusScope } from './FocusScope';

export default { title: 'Modular Lock (temp)/FocusScope' };

// true => default focus, false => no focus, ref => focus element
type FocusParam = boolean | React.RefObject<HTMLElement>;

export const Basic = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isEmptyForm, setIsEmptyForm] = React.useState(false);

  const [trapFocus, setTrapFocus] = React.useState(false);
  const [focusOnMount, setFocusOnMount] = React.useState<FocusParam>(false);
  const [focusOnUnmount, setFocusOnUnmount] = React.useState<FocusParam>(false);

  const ageFieldRef = React.useRef<HTMLInputElement>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <div style={{ fontFamily: 'sans-serif', textAlign: 'center' }}>
      <h1>FocusScope</h1>

      <div style={{ display: 'inline-block', textAlign: 'left', marginBottom: 20 }}>
        <label style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={trapFocus}
            onChange={(event) => setTrapFocus(event.target.checked)}
          />{' '}
          Trap focus?
        </label>
        <label style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={focusOnMount !== false}
            onChange={(event) => {
              setFocusOnMount(event.target.checked);
              if (event.target.checked === false) {
                setIsEmptyForm(false);
              }
            }}
          />{' '}
          Focus on mount?
        </label>
        {focusOnMount !== false && !isEmptyForm && (
          <label style={{ display: 'block', marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={focusOnMount !== true}
              onChange={(event) => setFocusOnMount(event.target.checked ? ageFieldRef : true)}
            />{' '}
            on "age" field?
          </label>
        )}
        {focusOnMount !== false && (
          <label style={{ display: 'block', marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={isEmptyForm}
              onChange={(event) => {
                setIsEmptyForm(event.target.checked);
                setFocusOnMount(true);
              }}
            />{' '}
            empty form?
          </label>
        )}
        <label style={{ display: 'block' }}>
          <input
            type="checkbox"
            checked={focusOnUnmount !== false}
            onChange={(event) => setFocusOnUnmount(event.target.checked)}
          />{' '}
          Focus on unmount?
        </label>
        {focusOnUnmount !== false && (
          <label style={{ display: 'block', marginLeft: 20 }}>
            <input
              type="checkbox"
              checked={focusOnUnmount !== true}
              onChange={(event) => setFocusOnUnmount(event.target.checked ? nextButtonRef : true)}
            />{' '}
            on "next" button?
          </label>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <button type="button" onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? 'Close' : 'Open'} form in between buttons
        </button>
      </div>

      <button type="button" style={{ marginRight: 10 }}>
        previous
      </button>

      {isOpen ? (
        <FocusScope
          trapped={trapFocus}
          onMountAutoFocus={(event) => {
            if (focusOnMount !== true) {
              event.preventDefault();
              if (focusOnMount) focusOnMount.current?.focus();
            }
          }}
          onUnmountAutoFocus={(event) => {
            if (focusOnUnmount !== true) {
              event.preventDefault();
              if (focusOnUnmount) focusOnUnmount.current?.focus();
            }
          }}
        >
          {({ ref }) => (
            <form
              ref={ref}
              key="form"
              style={{
                display: 'inline-flex',
                flexDirection: 'column',
                gap: 20,
                padding: 20,
                margin: 50,
                maxWidth: 500,
                border: '2px solid',
              }}
            >
              {!isEmptyForm && (
                <>
                  <input type="text" placeholder="First name" />
                  <input type="text" placeholder="Last name" />
                  <input ref={ageFieldRef} type="number" placeholder="Age" />
                  <button type="button" onClick={() => setIsOpen(false)}>
                    Close
                  </button>
                </>
              )}
            </form>
          )}
        </FocusScope>
      ) : null}

      <button ref={nextButtonRef} type="button" style={{ marginLeft: 10 }}>
        next
      </button>
    </div>
  );
};