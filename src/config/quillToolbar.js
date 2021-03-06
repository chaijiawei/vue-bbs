export default {
    container: [
        ['bold', 'italic', 'underline', 'strike', { 'align': [] }, 'code-block'],
        [{'size': ['small', false, 'large', 'huge']}],
        [
            { 'list': 'ordered'}, { 'list': 'bullet' },
            { 'indent': '-1'}, { 'indent': '+1' },
            { 'color': [] },
            { 'background': [] },
        ],
        ['clean'],
        ['link', 'image', 'video']
    ],
}
