function Loader(props) {
  return (
    <div>
      <h3 className={`text-3xl text-center m-5 ${props.fontSize}`}>
        {props.content ? props.content : "Loading..."}
      </h3>
    </div>
  );
}
export default Loader;
