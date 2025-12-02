"use client";
function buildInput() {
  return (
    <input
      type="text"
      placeholder="请输入项目ID"
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}
export default function About() {
  let text = "这是about关于页";
  return (
    <div>
      <div>{text}</div>
      <div>{buildInput()}</div>
      <div>
        <button
          onClick={() => {
            console.log("提交按钮被点击了");
            window.location.href = "about/888";
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          提交
        </button>
      </div>
    </div>
  );
}
