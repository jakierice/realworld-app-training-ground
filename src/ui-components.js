import './ui-components.css'
import { useParams, Link } from 'react-router-dom'

export const LoadingIndicator = (props) => {
  return (
    <svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000"
      {...props}
    >
      <g fill="none" fillRule="evenodd" strokeWidth={2}>
        <circle cx={22} cy={22} r={1}>
          <animate
            attributeName="r"
            begin="0s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="0s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
        <circle cx={22} cy={22} r={1}>
          <animate
            attributeName="r"
            begin="-0.9s"
            dur="1.8s"
            values="1; 20"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.165, 0.84, 0.44, 1"
            repeatCount="indefinite"
          />
          <animate
            attributeName="stroke-opacity"
            begin="-0.9s"
            dur="1.8s"
            values="1; 0"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.3, 0.61, 0.355, 1"
            repeatCount="indefinite"
          />
        </circle>
      </g>
    </svg>
  )
}

export const BlockLoadingIndicator = () => (
  <div className="BlockLoadingIndicator">
    <LoadingIndicator />
  </div>
)

export const Tab = ({ key, linkTo, title }) => {
  const { tab } = useParams()
  return (
    <li className="nav-item" key={key}>
      <Link to={linkTo} className={`nav-link ${tab === key ? 'active' : ''}`}>
        {title}
      </Link>
    </li>
  )
}

export const Tabs = ({ children }) => (
  <ul className="nav nav-pills outline-active">{children}</ul>
)
