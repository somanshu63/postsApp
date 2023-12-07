function Hero(props) {
  const title = props.title;
  const description = props.description;
  return (
    <div className="bg-creme p-4 flex items-center flex-col justify-evenly">
      <h1 className="blue text-3xl capitalize p-3">
        {title ? title : "blog app"}
      </h1>
      <p className=" pink text-lg p-3">
        {description ? description : "A place to share articles."}
      </p>
    </div>
  );
}

export default Hero;
