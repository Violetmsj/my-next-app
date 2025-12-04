/**
 * Navigation - 导航组件
 *
 * 提供页面间导航功能
 * 支持当前页面高亮
 *
 * @param {Object} props
 * @param {Array} props.items - 导航项数组 [{ label, href, icon? }]
 * @param {string} props.currentPath - 当前路径
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation({ items }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 mb-6">
      {items.map((item) => {
        const isActive = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }
            `}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
