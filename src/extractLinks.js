const extractLinks = (html) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const anchorst = doc.querySelectorAll('a')

  return Array.from(anchorst).map((a) => a.getAttribute('href'))
}

export default extractLinks

const html = `<div class="card mb-3">
  <div class="card-body">
    <div class="d-flex flex-column flex-sm-row">
      <div class="d-flex flex-column mr-4">
        <div class="text-muted text-center mb-3">
          <div class="h2 mb-0 font-weight-lighter">1</div>
          <div class="small">Ответ</div>
        </div>
        <div class="text-muted text-center mb-3">
          <div class="h2 mb-0 font-weight-lighter">7</div>
          <div class="small">Просмотров</div>
        </div>
      </div>
      <div>
        <h5 class="card-title">
          <a href="/resumes/1">Backend Software Engineer</a>
        </h5>
        <div class="card-text">
          <p>
            Программист-самоучка, избравший путь постоянного
            самосовершенствования. Ценю красивый и лаконичный код, люблю
            функциональное программирование (великая троица <code>map</code>,
            <code>filter</code>, <code>reduce</code>).
          </p>
          <p>
            Использую JS, Ruby, PHP, Python, Elixir, Clojure в разной степени
            мастерства.
          </p>
          <p>
            Восхищаюсь семейством LISP-языков, пишу свой интерпретатор LISP на
            Elixir. В настоящий момент углубляюсь в ОС Unix, чтобы в дальнейшем
            улучшить навыки DevOps.
          </p>
        </div>
        <div class="text-right small">
          <span class="mr-3 text-muted">12 дней</span>
          <a href="/users/6">Улугбек Туйчиев</a>
        </div>
      </div>
    </div>
  </div>
</div>
`
const links = extractLinks(html)
console.log(links) // ['/resumes/1', '/users/6']
