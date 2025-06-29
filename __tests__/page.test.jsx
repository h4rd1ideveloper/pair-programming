import '@testing-library/jest-dom';
import {render, screen, fireEvent} from '@testing-library/react';
import App from '../src/app/page';

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
        fireEvent.change(input, {target: {value: 'Nova tarefa de teste'}});
        fireEvent.click(addButton);
        const newTask = screen.getByText('Nova tarefa de teste');
        expect(newTask).toBeInTheDocument();
        expect(input).toHaveValue('');
    });

    it('alterna o status de uma tarefa entre "concluído" e "pendente"', () => {
        render(<App/>);
        const toggleButton = screen.getByText('Concluir', {selector: '.bg-green-500'});
        fireEvent.click(toggleButton);
        const task = screen.getByText('Study');
        expect(task).toHaveClass('line-through text-gray-400');
        fireEvent.click(toggleButton);

        expect(task).not.toHaveClass('line-through text-gray-400');
    });

    it('filtra corretamente as tarefas feitas', () => {
        render(<App/>);
        const completedButton = screen.getByText('Concluídas');
        fireEvent.click(completedButton);

        expect(screen.queryByText('Study')).not.toBeInTheDocument();
        expect(screen.getByText('Typescript')).toBeInTheDocument();
    });

    it('filtra corretamente as tarefas pendentes', () => {
        render(<App/>);
        const pendingButton = screen.getByText('Pendentes');

        fireEvent.click(pendingButton);

        expect(screen.getByText('Study')).toBeInTheDocument();
        expect(screen.queryByText('Typescript')).not.toBeInTheDocument();
    });

    it('exibe todas as tarefas quando "Todas" é selecionado', () => {
        render(<App/>);
        const allButton = screen.getByText('Todas');
        fireEvent.click(allButton);

        expect(screen.getByText('Study')).toBeInTheDocument();
        expect(screen.getByText('Typescript')).toBeInTheDocument();
    });
});