import { IconProps } from './IconProps';

const AddIcon = ({
  width = 16,
  height = 16,
  color = '#495057',
}: IconProps): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 16 16"
    >
      <path
        fill={color}
        d="M14.707 7.103H9.082v-5.67A.952.952 0 008.144.5c-.577 0-1.01.43-1.01.933v5.598H1.438C.933 7.103.5 7.533.5 8.036c0 .502.433.933.938.933h5.625v5.598c0 .502.432.933.937.933.505 0 .938-.43.938-.933V8.969h5.624c.505 0 .938-.43.938-.933 0-.503-.289-.933-.793-.933z"
      ></path>
    </svg>
  );
};

export default AddIcon;
