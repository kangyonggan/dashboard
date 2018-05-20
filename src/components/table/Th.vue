<template>
  <th :data-field="field" :data-sortable="sortable" :data-checkbox="checkbox" :data-formatter="formatter">
    {{title}}
    <div :id="uuid" class="hidden" v-if="formatter && formatter === 'render'">
      <slot></slot>
    </div>
  </th>
</template>

<script>
  let th = {
    name: 'Th',
    props: {
      title: {
        required: true,
        type: String
      },
      field: {
        required: false,
        type: String
      },
      sortable: {
        required: false,
        type: Boolean,
        default: false
      },
      checkbox: {
        required: false,
        type: Boolean,
        default: false
      },
      formatter: {
        required: false,
        type: String
      },
      uuid: {
        default: 'TH' + ('' + Math.random()).substring(2)
      }
    },
    methods: {
      render: function (value, row, index) {
        var data = {"value": value, "row": row, "index": index};
        console.log(data);
        return template(th.uuid, data);
      }
    }
  };

  export default th;

  function render(value, row, index) {
    var data = {"value": value, "row": row, "index": index};
    console.log(data);
    return template(th.uuid, data);
  }
</script>
