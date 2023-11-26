import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

export default function Categories() {
  return (
    <section className='my-2 flex'>
      <div className='inline-flex items-center gap-2'>
        <FontAwesomeIcon icon={faBars} />
        <span className='font-semibold'>Danh mục</span>
      </div>
      <ul className='menu rounded-box text-base lg:menu-horizontal'>
        <li>
          <a>
            <img
              className='h-12'
              src='https://images.thinkgroup.vn/unsafe/96x96/https://media-api-beta.thinkpro.vn/media/core/categories/2021/12/29/Rectangle%201461.png'
            />
            Inbox
          </a>
        </li>
        <li>
          <a>
            <img
              className='h-12'
              src='https://images.thinkgroup.vn/unsafe/96x96/https://media-api-beta.thinkpro.vn/media/core/categories/2021/12/29/Rectangle%201461.png'
            />
            Inbox
          </a>
        </li>
        <li>
          <a>
            <img
              className='h-12'
              src='https://images.thinkgroup.vn/unsafe/96x96/https://media-api-beta.thinkpro.vn/media/core/categories/2021/12/29/Rectangle%201461.png'
            />
            Inbox
          </a>
        </li>
      </ul>
    </section>
  )
}
