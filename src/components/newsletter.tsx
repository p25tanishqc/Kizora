'use client';
import { useState } from 'react';

export function Newsletter() {
  const [done, setDone] = useState(false);
  return (
    <section className="wrap py-20 text-center md:py-24">
      <h2 className="text-[30px] md:text-[38px]">Seasonal ritual notes, once a month.</h2>
      <p className="lead mx-auto mt-3 max-w-xl">What to change as the weather turns, new batches, and the occasional offer. <span className="needs-approval" title="State the real sign-up offer, if any">[Sign-up offer to be decided]</span></p>
      {done ? (
        <p className="mt-8 text-sage-deep" role="status">Thank you. This is a prototype, so nothing was saved.</p>
      ) : (
        <form className="mx-auto mt-8 flex max-w-md" onSubmit={e => { e.preventDefault(); setDone(true); }}>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input id="nl-email" type="email" required placeholder="Your email" className="min-w-0 flex-1 border border-ink bg-paper px-4 py-3 outline-none" />
          <button className="btn">Sign up</button>
        </form>
      )}
    </section>
  );
}
