import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Rating,
    TextField,
    Typography
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Categories.css';
import { useState } from 'react';
export const Categories = ({ categoryFilters, onCategorySelect, onPriceSelect, onRatingSelect }) => {
    const [min, setMin] = useState();
    const [max, setMax] = useState();

    return (
        <div className="categories">
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Categories</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    {categoryFilters.map((cat) => {
                        return (
                            <FormGroup>
                                <FormControlLabel
                                    onChange={(e) => { onCategorySelect(cat, e.target.checked) }}
                                    control={<Checkbox />}
                                    label={cat} />
                            </FormGroup>
                        )
                    })}

                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField hiddenLabel id="filled-hidden-label-small" placeholder="min" variant="filled" size="small" onChange={(e) => setMin(e.target.value)} value={min} />
                    <TextField hiddenLabel id="filled-hidden-label-small" placeholder="max" variant="filled" size="small" onChange={(e) => setMax(e.target.value)} value={max} />
                    <Button variant="contained" onClick={() => { onPriceSelect(min, max) }}>Go</Button>
                    <Button variant="contained"
                        onClick={() => {
                            onPriceSelect(0, Infinity);
                            setMin('');
                            setMax('')
                        }}>X</Button>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header">
                    <Typography>Rating</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Rating name="half-rating" precision={0.5}
                        onChange={(e, value) => {
                            onRatingSelect(value);
                        }} />
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
export default Categories;