export default function AboutProjectId({ params }) {
  let text = "这是about关于页-项目详情页-项目ID:" + params.projectId;
  return <div>{text}</div>;
}
