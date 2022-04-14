import React from "react";
import { useField, Field } from "formik";
import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";

export default function SimpleModeInput({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <FormControl fontSize="lg" color="#fff" h={28}>
      <FormLabel fontSize="lg" ml={1} htmlFor={props.id || props.name}>
        {label}
      </FormLabel>
      <Field ml={0} pl={1} as={Input} bg="black" {...field} {...props} />
      {meta.touched && meta.error ? (
        <Text textAlign="left" color="red" ml={1} fontSize="sm">
          {meta.error}
        </Text>
      ) : null}
    </FormControl>
  );
}

// import { FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
// import { useField, Field } from "formik";

// export default function CommonInput({ label,flexBasis, ...props }) {
//   const [field, meta] = useField(props);
//   return (
//     <FormControl px={1} flexBasis={flexBasis}>
//       {label && <FormLabel ml={2} htmlFor={props.id || props.name}>
//         {label}
//       </FormLabel>}
//       <Field pl={2} as={Input} bg="black" {...field} {...props} />
//       {meta.touched && meta.error ? (
//         <Text textAlign="left" color="red" ml={2}>
//           {meta.error}
//         </Text>
//       ) : null}
//     </FormControl>
//   );
// }
