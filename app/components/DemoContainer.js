/**
 * DemoContainer - 演示容器组件
 *
 * 用于包装所有的交互式演示内容
 * 提供统一的样式和布局
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子组件
 * @param {string} props.title - 演示标题
 * @param {string} props.description - 演示描述
 */

export default function DemoContainer({ children, title, description }) {
  return (
    <div className="mb-8 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-white dark:bg-gray-800 shadow-sm">
      {/* 标题区域 */}
      {(title || description) && (
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}

      {/* 演示内容区域 */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
