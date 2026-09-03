export default function Home() {
  return (
    <main>
      <h1>KisanConnect</h1>

      <p>Connecting farmers directly with buyers.</p>

      <div>
        <a href="/login?role=farmer">
          <button>I'm a Farmer</button>
        </a>

        <a href="/login?role=buyer">
          <button>I'm a Buyer</button>
        </a>
      </div>
    </main>
  );
}