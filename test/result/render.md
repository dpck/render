## renders select value on option through a component
<select value="B">
  <optgroup label="foo">
    <option value="A">A</option>
    <option value="B">B</option>
  </optgroup>
</select>

/* expected */
<select><optgroup label="foo"><option value="A">A</option><option selected value="B">B</option></optgroup></select>
/**/