package simonlee.elegantweb.collector;

import simonlee.elegant.finder.Issue;
import simonlee.elegant.utils.PubSub;

public abstract class AbstractIssueHandle implements PubSub.Handle {

    // CallChain is just a intermediate representation of Information
    public static class CallChain extends Collector.Information { }

    private Collector collector;

    public AbstractIssueHandle(Collector collector) {
        this.collector = collector;
    }

    @Override
    public void handle(PubSub.Message message) {
        if (!(message instanceof Issue)) {
            return ;
        }

        CallChain callChain = issueToCallChain((Issue) message);
        if (null != callChain) {
            collector.submit(((Issue) message).getModel(), callChain);
        }
    }

    /**
     * issueToCallChain converts an issue to a CallChain
     *
     * @param i issue to be converted
     * @return  call chain after converting
     */
    protected abstract CallChain issueToCallChain(Issue i);

}
