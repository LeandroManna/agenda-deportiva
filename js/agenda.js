document.addEventListener('DOMContentLoaded', function() {
    fetch('js/agenda.json')
        .then(response => response.json())
        .then(data => {
            if (data.fechas && Array.isArray(data.fechas)) {
                let tabs = '';
                let tabContent = '';

                data.fechas.forEach((fecha, index) => {
                    const activeClass = index === 0 ? 'active' : '';
                    tabs += `
                        <li class="nav-item">
                            <a class="nav-link ${activeClass} custom-link" data-bs-toggle="tab" href="#fecha-${index}">${fecha.fecha}</a>
                        </li>
                    `;

                    tabContent += `
                        <div id="fecha-${index}" class="tab-pane fade ${activeClass} show my-2 transparent-tab">
                            ${fecha.torneos.map((torneo, torneoIndex) => {
                                const torneoId = `torneo-${index}-${torneoIndex}`;
                                return `
                                    <div class="card mb-4">
                                        <div class="card-header">
                                            <h5>
                                                <a class="collapsed" data-bs-toggle="collapse" href="#${torneoId}" aria-expanded="false" aria-controls="${torneoId}">
                                                    ${torneo.nombre}
                                                </a>
                                            </h5>
                                        </div>
                                        <div id="${torneoId}" class="collapse">
                                            <div class="card-body">
                                                ${torneo.eventos.map((evento, eventoIndex) => {
                                                    const eventoId = `evento-${index}-${torneoIndex}-${eventoIndex}`;
                                                    return `
                                                        <div class="card mb-2">
                                                            <div class="card-header">
                                                                <h6>
                                                                    <a class="collapsed" data-bs-toggle="collapse" href="#${eventoId}" aria-expanded="false" aria-controls="${eventoId}">
                                                                        ${evento.nombre}
                                                                    </a>
                                                                </h6>
                                                            </div>
                                                            <div id="${eventoId}" class="collapse">
                                                                <div class="card-body">
                                                                    <p><strong>Fecha:</strong> ${evento.fecha}</p>
                                                                    <p><strong>Deporte:</strong> ${evento.deporte.nombre}</p>
                                                                    <table class="table table-bordered">
                                                                        <thead>
                                                                            <tr>
                                                                                <th>Canal</th>
                                                                                <th>Plataformas</th>
                                                                                <th>Frecuencias</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                        ${evento.canales && Array.isArray(evento.canales) ? evento.canales.map(canal => `
                                                                            <tr>
                                                                                <td>${canal.nombre}</td>
                                                                                <td>${canal.plataformas ? canal.plataformas.join(', ') : '-'}</td>
                                                                                <td>
                                                                                    ${canal.frecuencias ? `
                                                                                        HD: ${canal.frecuencias.HD || '-'}, 
                                                                                        ANALOGICO: ${canal.frecuencias.ANALOGICO || '-'}, 
                                                                                        ISDBT: ${canal.frecuencias.ISDBT || '-'}, 
                                                                                        IPTV: ${canal.frecuencias.IPTV || '-'}
                                                                                    ` : '-'}
                                                                                </td>
                                                                            </tr>
                                                                        `).join('') : '-'}
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    `;
                                                }).join('')}
                                            </div>
                                        </div>
                                    </div>
                                `;
                            }).join('')}
                        </div>
                    `;
                });

                document.getElementById('agenda-container').innerHTML = `
                    <ul class="nav nav-tabs">
                        ${tabs}
                    </ul>
                    <div class="tab-content">
                        ${tabContent}
                    </div>
                `;
            } else {
                console.error("Datos no válidos: la clave 'fechas' no existe o no es un array");
            }
        })
        .catch(error => console.error("Error al cargar el archivo JSON: " + error));
});