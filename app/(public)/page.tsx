// this page should be used only as a splash page to decide where a user should be navigated to
// when logged in --> to /heists
// when not logged in --> to /login

import { Clock8 } from "lucide-react"

export default function Home() {
  return (
    <div className="center-content">
      <div className="page-content">
        <h1>
          P<Clock8 className="logo" strokeWidth={2.75} />cket Heist
        </h1>
        <div>Tiny missions. Big office mischief.</div>
        <p>
          Pocket Heist turns your workplace into a playground. Coordinate stealthy
          pranks, earn points for pulling them off, and climb the leaderboard —
          all without leaving your desk (officially).
        </p>
        <p>
          Create a heist, recruit your crew, and let the chaos begin. Your boss
          will never know what hit them.
        </p>
      </div>
    </div>
  )
}
