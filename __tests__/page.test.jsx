import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../src/app/page'; // Ajuste o caminho correto da sua página

describe('App Component', () => {
    it('renderiza o título da página', () => {
        render(<App/>);
        const heading = screen.getByRole('heading', {level: 1, name: 'Tarefas'});
        expect(heading).toBeInTheDocument();
    });

    it('renderiza o input de adição de tarefa', () => {
        render(<App/>);
        const input = screen.getByPlaceholderText('Nova tarefa');
        expect(input).toBeInTheDocument();
    });

    it('adiciona uma nova tarefa quando o botão é clicado', () => {
        render(<App/>);
        const input = screen.getByPlaceholderText('Nova tarefa');
        const addButton = screen.getByText('Adicionar');

        // Simula digitar no input
        fireEvent.change(input, {target: {value: 'Nova tarefa de teste'}});
        fireEvent.click(addButton);

        // Verifica se a tarefa foi adicionada à lista
        const newTask = screen.getByText('Nova tarefa de teste');
        expect(newTask).toBeInTheDocument();

        // Verifica se o input foi limpo após adicionar
        expect(input).toHaveValue('');
    });

    it('alterna o status de uma tarefa entre "concluído" e "pendente"', () => {
        render(<App/>);
        const toggleButton = screen.getByText('Concluir', {selector: '.bg-green-500'}); // Primeiro botão "Concluir"

        // Simula o clique para alternar o status
        fireEvent.click(toggleButton);

        // Verifica se o texto da tarefa foi riscado
        const task = screen.getByText('Study'); // Primeira tarefa no estado inicial
        expect(task).toHaveClass('line-through text-gray-400');

        // Simula clicar novamente para desfazer
        fireEvent.click(toggleButton);

        // Verifica se o texto não está mais riscado
        expect(task).not.toHaveClass('line-through text-gray-400');
    });

    it('filtra corretamente as tarefas feitas', () => {
        render(<App/>);
        const completedButton = screen.getByText('Concluídas');

        // Simula clicar em "Concluídas"
        fireEvent.click(completedButton);

        // Verifica se apenas a tarefa concluída permanece visível
        expect(screen.queryByText('Study')).not.toBeInTheDocument(); // A tarefa pendente não deve estar visível
        expect(screen.getByText('Typescript')).toBeInTheDocument(); // A tarefa concluída deve permanecer
    });

    it('filtra corretamente as tarefas pendentes', () => {
        render(<App/>);
        const pendingButton = screen.getByText('Pendentes');

        // Simula clicar em "Pendentes"
        fireEvent.click(pendingButton);

        // Verifica se apenas as tarefas pendentes permanecem visíveis
        expect(screen.getByText('Study')).toBeInTheDocument(); // A tarefa pendente deve permanecer
        expect(screen.queryByText('Typescript')).not.toBeInTheDocument(); // A tarefa concluída não deve estar visível
    });

    it('exibe todas as tarefas quando "Todas" é selecionado', () => {
        render(<App/>);
        const allButton = screen.getByText('Todas');

        // Simula clicar em "Todas"
        fireEvent.click(allButton);

        // Verifica se todas as tarefas são exibidas
        expect(screen.getByText('Study')).toBeInTheDocument();
        expect(screen.getByText('Typescript')).toBeInTheDocument();
    });
});